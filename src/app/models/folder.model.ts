export interface FolderModel {
  "id": string;
  "name": string;
  "displayName": string;
  "currentRegister": string;
  "registers": Map<string, number>;
  "totalDocuments": number;
  "documentsPerRegister": number;
  "documentsPerFolder": number;
  "createdAt": string;
  "isFull": boolean
}
