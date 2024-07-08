import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserPasswordRequestCommand } from '../impl/update-user-password-request.command';
import { AppErrorService } from 'src/modules/error/error.service';
import { UserRepository } from '../../entities/user.repository';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { BaseResponse, EventTypesEnum } from 'src/interface';
import { PasswordService } from 'src/service/password/password.service';
import { MailService } from 'src/service/mail-service/mail-service.service';
import { ConfigService } from '@nestjs/config';
import { MailSubjects, MailTemplateEnum } from 'src/templates/mail-templates';
import { CreateHistoryCommand } from 'src/modules/history/command/impl/create-history.command';

@CommandHandler(UpdateUserPasswordRequestCommand)
export class UpdateUserPasswordRequestHandler
  implements ICommandHandler<UpdateUserPasswordRequestCommand>
{
  constructor(
    private readonly userRepo: UserRepository,
    private readonly errorService: AppErrorService,
    private readonly logger: AppLoggerService,
    private readonly hashService: PasswordService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(UpdateUserPasswordRequestHandler.name);
  }

  async execute({
    payload,
  }: UpdateUserPasswordRequestCommand): Promise<BaseResponse> {
    const { email } = payload;
    this.logger.log(
      `Execution started for update password request with payload: ${JSON.stringify(payload, null, 2)}`,
    );

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      this.logger.error(
        `User not found with email: ${email}`,
        'Email not Found',
      );
      throw this.errorService.throwNotFoundError(`User not found`);
    }

    const token = await this.hashService.hashPassword(
      `${new Date().getTime()}-${user.id}`,
    );
    user.token = token;
    await this.userRepo.save(user);

    const updatePasswordLink = `${this.configService.get('ORIGIN')}/auth/update-password?token=${token}`;
    const emailContent = this.mailService.getMailTemplate(
      MailTemplateEnum.RESETPASSWORD,
      {
        name: user.userName,
        verifyLink: updatePasswordLink,
      },
    );

    await this.mailService.sendMail(
      email,
      MailSubjects[MailTemplateEnum.RESETPASSWORD],
      emailContent,
    );

    this.logger.log(`Update password link sent to ${email}`);
    this.commandBus.execute(
      new CreateHistoryCommand(
        EventTypesEnum.UserPasswordUpdateRequestEvent,
        user.id,
        null,
        null,
      ),
    );
    return {
      message: `Update password link sent to your email.`,
    };
  }
}
