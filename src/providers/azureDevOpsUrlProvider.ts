export default class AzureDevOpsUrlProvider implements urlProviderBase {

  constructor(){
  }

  isMatch(remoteUrl: string): boolean {
    return remoteUrl.startsWith('https://dev.azure.com/')
  }

  buildUrl(remoteUrl: string, filePath: string, branchName : string, startLineNumber?: number, startColumnNumber?: number, endLineNumber?: number, endColumnNumber?: number): string {
    let url = `${remoteUrl}?path=/${filePath}&version=GB${branchName}`

    if(startLineNumber != undefined) {
      url = `${url}&line=${startLineNumber}`
    }

    if(startColumnNumber != undefined) {
      url = `${url}&startColumnNumber=${startColumnNumber}`
    }

    if(endLineNumber != undefined) {
      url = `${url}&endLineNumber=${endLineNumber}`
    }

    if(endColumnNumber != undefined) {
      url = `${url}&endColumnNumber=${endColumnNumber}`
    }

    url = `${url}&lineStyle=plain&_a=contents`

    return url
  }
}
