import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProfileCommand } from '../impl/create-profile.command';
import { ProfileRepository } from '../../entities/profile.repository';
import { Profile } from '../../entities/profile.entity';
import { UserRepository } from 'src/modules/users/entities/user.repository';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { AppErrorService } from 'src/modules/error/error.service';
import { EventTypesEnum, ProfileResponse } from 'src/interface';
import { CreateHistoryCommand } from 'src/modules/history/command/impl/create-history.command';

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    private readonly profileRepo: ProfileRepository,
    private readonly userRepo: UserRepository,
    private readonly logger: AppLoggerService,
    private readonly errorService: AppErrorService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(CreateProfileHandler.name);
  }

  async execute({
    payload,
    userId,
  }: CreateProfileCommand): Promise<ProfileResponse> {
    this.logger.log(`Processing CreateProfileCommand for UserId: ${userId}`);

    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      this.logger.error(`User not found: UserId ${userId}`, '');
      throw this.errorService.throwNotFoundError(`User not found`);
    }

    if (user.profile) {
      this.logger.error(`Profile already exists for UserId ${userId}`, '');
      throw this.errorService.throwConflictError(`Profile already created`);
    }

    this.logger.log(
      `Creating profile for UserId: ${userId} with payload: ${JSON.stringify(payload)}`,
    );

    const profile = new Profile({
      ...payload,
      user,
    });

    try {
      const createdProfile = await this.profileRepo.save(profile);
      this.logger.log(`Profile successfully created for UserId: ${userId}`);
      this.commandBus.execute(
        new CreateHistoryCommand(
          EventTypesEnum.ProfileCreatedEvent,
          user.id,
          null,
          null,
        ),
      );
      return {
        data: createdProfile,
        message: 'Profile successfully created',
      };
    } catch (error) {
      this.logger.error(
        `Failed to create profile for UserId: ${userId}`,
        error.stack,
      );
      throw error;
    }
  }
}
