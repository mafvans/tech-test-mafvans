export type GetSlackConversationHistoryType = {
  ok: boolean;
  messages: MessageType[];
  has_more: boolean;
  pin_count: number;
  response_metadata: MetadataType;
  error?: string;
};

type MessageType = {
  type: string;
  user: string;
  text: string;
  ts: string;
  files: AttachmentsType[];
};
type MetadataType = {
  next_cursor: string;
};
type AttachmentsType = {
  id: string;
  name: string;
  title: string;
  mimetype: string;
  user: string;
};
