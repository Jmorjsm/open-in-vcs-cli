export class BuildUrlRequest {
  constructor(remoteUrl: string,
              branchName: string,
              filePath?: string,
              startLineNumber?: number,
              startColumnNumber?: number,
              endLineNumber?: number,
              endColumnNumber?: number) {
    this.remoteUrl = remoteUrl
    this.branchName = branchName
    this.filePath = filePath
    this.startLineNumber = startLineNumber
    this.startColumnNumber = startColumnNumber
    this.endLineNumber = endLineNumber
    this.endColumnNumber = endColumnNumber
  }

  remoteUrl!: string;
  branchName!: string;
  filePath?: string;
  startLineNumber?: number;
  startColumnNumber?: number;
  endLineNumber?: number;
  endColumnNumber?: number;
}
