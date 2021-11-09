import { BuildUrlRequest } from "../models/buildUrlRequest"
import { UrlProviderBase } from "./urlProviderBase"

export default class AzureDevOpsUrlProvider implements UrlProviderBase {
  constructor(){}
  name: string = AzureDevOpsUrlProvider.name

  isMatch(remoteUrl: string): boolean {
    return remoteUrl.includes('dev.azure.com/')
  }

  buildUrl(buildUrlRequest : BuildUrlRequest): string {
    let urlToOpen = this.formatRepositoryBaseUrl(buildUrlRequest.remoteUrl, buildUrlRequest.branchName, buildUrlRequest.filePath)
    urlToOpen += `&lineStyle=plain&_a=contents`

    return urlToOpen
  }

  formatRepositoryBaseUrl(remoteUrl: string, branchName: string, filePath?: string): string {
    let url = `${remoteUrl}?path=/${filePath}&version=GB${branchName}`
    return url
  }

  formatLineNumbers(startLineNumber?: number, startColumnNumber?: number, endLineNumber?: number, endColumnNumber?: number): string {
    let lineNumbers = ''
    if(startLineNumber != undefined) {
      lineNumbers += this.formatStartLineNumber(startLineNumber)
    }

    if(startColumnNumber != undefined) {
      lineNumbers += this.formatStartColumnNumber(startColumnNumber)
    }

    if(endLineNumber != undefined) {
      lineNumbers += this.formatEndLineNumber(endLineNumber)
    }

    if(endColumnNumber != undefined) {
      lineNumbers += this.formatEndColumnNumber(endColumnNumber)
    }

    return lineNumbers
  }

  formatStartLineNumber(startLineNumber?: number): string {
     return `&line=${startLineNumber}`
  }

  formatStartColumnNumber(startColumnNumber?: number): string {
     return `&startColumnNumber=${startColumnNumber}`
  }

  formatEndLineNumber(endLineNumber?: number): string {
     return `&endLineNumber=${endLineNumber}`
  }

  formatEndColumnNumber(endColumnNumber?: number): string {
     return `&endColumnNumber=${endColumnNumber}`
  }
}
