import {MemberDto} from './member/member.dto';

export interface DialogData {
  title: string;
  message: string;
  members: MemberDto[];
  quizId?: string;
}
