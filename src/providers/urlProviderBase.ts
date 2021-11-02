abstract class urlProviderBase {
  abstract isMatch(remoteUrl : string) : boolean
  abstract buildUrl(remoteUrl: string, filePath: string, branchName : string, startLineNumber?: number, startColumnNumber?: number, endLineNumber?: number, endColumnNumber?: number): string
}
