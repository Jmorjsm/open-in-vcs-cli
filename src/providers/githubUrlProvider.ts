export default class GitHubUrlProvider implements urlProviderBase {

  constructor(){
  }

  isMatch(remoteUrl: string): boolean {
    return remoteUrl.startsWith('https://github.com/')
  }

  buildUrl(remoteUrl: string, filePath: string, branchName : string, startLineNumber?: number, startColumnNumber?: number, endLineNumber?: number, endColumnNumber?: number): string {
    let urlToOpen = `${remoteUrl}/tree/${branchName}/${filePath}?plain=1`

    if (startLineNumber != undefined) {
      urlToOpen = `${urlToOpen}#L${startLineNumber}`
    }

    return urlToOpen
  }
}
