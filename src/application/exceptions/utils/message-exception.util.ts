import {
  GetMessageSlackException,
  SendMessageSlackException,
  AddDocumentToDatabaseException,
  AttachFileSlackException,
} from '@domain/exceptions';
import { concatWithHyphenMessage } from '@domain/utils';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
enum ExceptionMessageEnum {
  ATTACH_FILE_SLACK = 'Error attaching file with slack api ',
  GET_MESSAGE_SLACK = 'Error getting messages with slack api ',
  SEND_MESSAGE_SLACK = 'Error sending message with slack api ',
  ADD_DOCUMENT_TO_DATABASE = 'Error adding register to database',
}

export const getMessageByException = (
  error: Error,
  identifier: string,
): string => {
  const exceptionMessageMap = new Map<Function, string>([
    [AttachFileSlackException, ExceptionMessageEnum.ATTACH_FILE_SLACK],
    [GetMessageSlackException, ExceptionMessageEnum.GET_MESSAGE_SLACK],
    [SendMessageSlackException, ExceptionMessageEnum.SEND_MESSAGE_SLACK],
    [
      AddDocumentToDatabaseException,
      ExceptionMessageEnum.ADD_DOCUMENT_TO_DATABASE,
    ],
  ]);

  const errorMessage = error.message;
  const message = exceptionMessageMap.get(error.constructor) || '';
  return concatWithHyphenMessage(
    identifier,
    concatWithHyphenMessage(message, errorMessage),
  );
};
