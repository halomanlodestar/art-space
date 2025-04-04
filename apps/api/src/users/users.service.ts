import { UsersRepository } from '../repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import argon from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { CredentialProvider } from '@art-space/database';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(credentials: CreateUserDto, provider?: CredentialProvider) {
    const { password, ...rest } = credentials;
    const hashedPassword = await argon.hash(password);

    return this.userRepository.create({
      provider,
      password: hashedPassword,
      ...rest,
    });
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username, {
      include: {
        memberOf: {
          select: {
            community: {
              select: {
                image: true,
                slug: true,
                name: true,
                _count: {
                  select: {
                    followers: true,
                  }
                }
              }
            }
          }
        }
      },
      omit: {
        id: true,
        email: true,
        password: true,
        provider: true,
      },
    });
  }

  async update(username: string, data: UpdateUserDto) {
    return this.userRepository.update(username, data);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
