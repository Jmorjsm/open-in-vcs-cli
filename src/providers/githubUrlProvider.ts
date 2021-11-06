import { BuildUrlRequest } from "../models/BuildUrlRequest"
import { UrlProviderBase } from "./urlProviderBase"

export default class GitHubUrlProvider implements UrlProviderBase {
  constructor(){}

  isMatch(remoteUrl: string): boolean {
    return remoteUrl.includes('github.com/')
  }

  buildUrl(buildUrlRequest : BuildUrlRequest): string {
    let urlToOpen = this.formatRepositoryBaseUrl(buildUrlRequest.remoteUrl, buildUrlRequest.branchName, buildUrlRequest.filePath)
    urlToOpen += this.formatLineNumbers(buildUrlRequest.startLineNumber, buildUrlRequest.startColumnNumber, buildUrlRequest.endLineNumber, buildUrlRequest.endColumnNumber)

    return urlToOpen
  }

  formatLineNumbers(startLineNumber?: number, startColumnNumber?: number, endLineNumber?: number, endColumnNumber?: number): string {
    let lineNumbers = ''
    if(startLineNumber != undefined){
      lineNumbers += this.formatStartLineNumber(startLineNumber)

      if(endLineNumber != undefined){
        lineNumbers += this.formatEndLineNumber(endLineNumber)
      }
    }
    return lineNumbers
  }

  formatStartLineNumber(startLineNumber?: number): string {
    return `#L${startLineNumber}`
  }

  formatEndLineNumber(endLineNumber?: number): string {
    return `-L${endLineNumber}`
  }

  formatStartColumnNumber(startColumnNumber?: number): string {
    throw new Error("Method not implemented.");
  }

  formatEndColumnNumber(endColumnNumber?: number): string {
    throw new Error("Method not implemented.");
  }

  formatRepositoryBaseUrl(remoteUrl : string, branchName : string, filePath? : string): string {
    let repoBaseUrl = `${remoteUrl}/tree/${branchName}/`;
    if(filePath != undefined){
      repoBaseUrl += `${filePath}?plain=1`
    }

    return repoBaseUrl
  }
}
