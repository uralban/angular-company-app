import {MemberDto} from './member/member.dto';
import {NotificationDto} from './notifications/notification.dto';

export interface DialogData {
  title: string;
  message: string;
  members: MemberDto[];
  quizId?: string;
  notifications?: NotificationDto[];
}
