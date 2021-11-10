import { BuildUrlRequest } from "../models/buildUrlRequest"
import { UrlProviderBase } from "../providers/urlProviderBase"
import GitHubUrlProvider from '../providers/githubUrlProvider'
import AzureDevOpsUrlProvider from '../providers/azureDevOpsUrlProvider'

export default class UrlService {
  constructor(){}
  static providers : UrlProviderBase[] = [
    new GitHubUrlProvider(),
    new AzureDevOpsUrlProvider(),
  ]

  public buildUrl(BuildUrlRequest : BuildUrlRequest) : string {
    for (let i = 0; i < UrlService.providers.length; ++i){
      let provider = UrlService.providers[i]
      if(provider.isMatch(BuildUrlRequest.remoteUrl)) {
        return provider.buildUrl(BuildUrlRequest)
      }
    }

    throw new Error('Failed to build url as no url providers matched the remote.')
  }
}
