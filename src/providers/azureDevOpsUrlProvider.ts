import { BuildUrlRequest } from "../models/buildUrlRequest"
import { UrlProviderBase } from "./urlProviderBase"

export default class AzureDevOpsUrlProvider implements UrlProviderBase {
  constructor(){}
  name: string = AzureDevOpsUrlProvider.name

  isMatch(remoteUrl: string): boolean {
    return remoteUrl.includes('dev.azure.com')
  }

  buildUrl(buildUrlRequest : BuildUrlRequest): string {
    let urlToOpen = this.formatRepositoryBaseUrl(buildUrlRequest.remoteUrl, buildUrlRequest.branchName, buildUrlRequest.filePath)
    urlToOpen += this.formatLineNumbers(buildUrlRequest.startLineNumber, buildUrlRequest.startColumnNumber, buildUrlRequest.endLineNumber, buildUrlRequest.endColumnNumber)
    urlToOpen += `&lineStyle=plain&_a=contents`

    return urlToOpen
  }

  formatRepositoryBaseUrl(remoteUrl: string, branchName: string, filePath?: string): string {

    if(remoteUrl.startsWith("git@ssh.")){
      // Convert ssh url into https url
      let parts = remoteUrl.replace("git@ssh.", "").replace(":v3", "").split("/")
      remoteUrl = `https://${parts[0]}/${parts[1]}/_git/${parts[2]}`
    }

    let url = `${remoteUrl}?path=/${filePath}&version=GB${branchName}`
    return url
  }

  formatLineNumbers(startLineNumber?: number, startColumnNumber?: number, endLineNumber?: number, endColumnNumber?: number): string {
    let lineNumbers = ''
    if (startLineNumber != undefined) {
      lineNumbers += this.formatStartLineNumber(startLineNumber)

      if (startColumnNumber != undefined) {
        lineNumbers += this.formatStartColumnNumber(startColumnNumber)
      }
      else {
        lineNumbers += this.formatStartColumnNumber(0)
      }

      if (endLineNumber != undefined) {
        lineNumbers += this.formatEndLineNumber(endLineNumber)
      }
      else {
        lineNumbers += this.formatEndLineNumber(startLineNumber)
      }

      if (endColumnNumber != undefined) {
        lineNumbers += this.formatEndColumnNumber(endColumnNumber)
      }
      else {
        lineNumbers += this.formatEndColumnNumber(0)
      }
    }

    return lineNumbers
  }

  formatStartLineNumber(startLineNumber?: number): string {
     return `&line=${startLineNumber}`
  }

  formatStartColumnNumber(startColumnNumber?: number): string {
     return `&lineStartColumn=${startColumnNumber}`
  }

  formatEndLineNumber(endLineNumber?: number): string {
     return `&lineEnd=${endLineNumber}`
  }

  formatEndColumnNumber(endColumnNumber?: number): string {
     return `&lineEndColumn=${endColumnNumber}`
  }
}
