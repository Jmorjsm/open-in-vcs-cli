import { BuildUrlRequest } from "../models/BuildUrlRequest";

export abstract class UrlProviderBase {
  abstract isMatch(remoteUrl : string) : boolean
  abstract buildUrl(buildUrlRequest : BuildUrlRequest): string
  abstract formatRepositoryBaseUrl(remoteUrl : string, branchName : string, filePath : string): string
  abstract formatLineNumbers(startLineNumber?: number, startColumnNumber?: number, endLineNumber?: number, endColumnNumber?: number): string
  abstract formatStartLineNumber(startLineNumber?: number) : string
  abstract formatStartColumnNumber(startColumnNumber?: number) : string
  abstract formatEndLineNumber(endLineNumber?: number) : string
  abstract formatEndColumnNumber(endColumnNumber?: number) : string
}
