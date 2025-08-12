import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../interfaces';
import { UserRole } from '@/common/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password' | 'refreshTokenHash'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const safeUser: Omit<User, 'password' | 'refreshTokenHash'> = {
        id: user.id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return safeUser;
    }
    return null;
  }

  private async signAccessToken(payload: {
    email: string;
    sub: string;
    role?: UserRole | null;
  }) {
    const accessSecret = this.configService.get<string>('jwt.access.secret');
    const expiresIn = this.configService.get<string>('jwt.access.expiresIn');
    return this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn,
    });
  }

  private async signRefreshToken(payload: {
    email: string;
    sub: string;
    role?: UserRole | null;
  }) {
    const refreshSecret = this.configService.get<string>('jwt.refresh.secret');
    const expiresIn = this.configService.get<string>('jwt.refresh.expiresIn');
    return this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn,
    });
  }

  private async setUserRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.setRefreshTokenHash(userId, refreshTokenHash);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);

    await this.setUserRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async refreshToken(refreshToken: string) {
    let decoded: JwtPayload;
    try {
      decoded = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('jwt.refresh.secret'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findOne(decoded.sub);
    if (!user || !user.id) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Fetch with refreshTokenHash selected; UsersService.findOne hides it by default
    const userWithToken = await this.usersService.findOneWithSensitiveFields(
      decoded.sub,
    );

    if (!userWithToken?.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token revoked');
    }

    const refreshTokenIsValid = await bcrypt.compare(
      refreshToken,
      userWithToken.refreshTokenHash,
    );
    if (!refreshTokenIsValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const [newAccessToken, newRefreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);

    // Rotate stored refresh token
    await this.setUserRefreshToken(user.id, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.clearRefreshToken(userId);
  }

  async register(registerDto: CreateUserDto) {
    const user = await this.usersService.create(registerDto);
    return this.login({ email: user.email, password: registerDto.password });
  }
}
