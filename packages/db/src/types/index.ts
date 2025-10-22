export type JSONContent = {
  [key: string]: any;
  type?: string;
  attrs?: Record<string, any> | undefined;
  content?: JSONContent[];
  marks?: { type: string; attrs?: Record<string, any>; [key: string]: any }[];
  text?: string;
};
