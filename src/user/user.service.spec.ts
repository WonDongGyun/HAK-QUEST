import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundUserException } from './exception/NotFoundUserException';
import { User } from './user.model';
import { UserService } from './user.service';

const mockUserRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  // it('should be defined', () => {
  //   expect(userService).toBeDefined();
  // });

  describe('사용자 생성', () => {
    const createUser = {
      name: 'wondonggyun',
    };

    it('사용자 생성 실패', async () => {
      userRepository.save.mockRejectedValue('save Error');
      try {
        const result = await userService.createUser(createUser);
      } catch (err) {
        expect(err).toEqual('save Error');
      }
    });

    it('사용자 생성 완료', async () => {
      userRepository.save.mockResolvedValue(createUser);
      const result = await userService.createUser(createUser);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(createUser);
      expect(result).toEqual(createUser);
    });
  });

  describe('사용자 찾기', () => {
    const id = 2;

    const findOneArgs = {
      where: {
        id: 2,
      },
    };

    it('사용자 찾기 실패', async () => {
      userRepository.findOne.mockResolvedValue(null);
      try {
        const result = await userService.findUser(id);
      } catch (err) {
        expect(err).toEqual(new NotFoundUserException(id));
      }
    });

    it('사용자 찾기 완료', async () => {
      userRepository.findOne.mockResolvedValue(id);
      const result = await userService.findUser(id);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(findOneArgs);
      expect(result).toEqual(id);
    });
  });

  describe('사용자 삭제', () => {
    const id = 2;
    const findOneUser = {
      id: 2,
    };
    const deleteUser = {
      id: 2,
    };

    it('사용자 삭제 완료', async () => {
      userRepository.findOne.mockResolvedValue(findOneUser);
      userRepository.softDelete.mockResolvedValue(deleteUser);

      const result = await userService.deleteUser(id);

      expect(userRepository.findOne).toHaveBeenCalledTimes(2);

      expect(userRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(userRepository.softDelete).toHaveBeenCalledWith(deleteUser);
      expect(result).toEqual(deleteUser);
    });

    it('삭제 대상 찾기 실패', async () => {
      userRepository.findOne.mockResolvedValue(null);
      try {
        const result = await userService.deleteUser(id);
      } catch (err) {
        expect(err).toEqual(new NotFoundUserException(id));
      }
    });
  });
});
