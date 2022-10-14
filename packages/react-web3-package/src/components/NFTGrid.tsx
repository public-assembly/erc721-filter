/* @ts-ignore */
import * as React from 'react'
import { NFTProvider } from '../context'
import { useTokensQuery } from '../hooks'
import { NFTGridLoadMore } from './NFTGridLoadMore'

export function NFTGrid({
  contractAddress,
  ownerAddress,
  pageSize = 15,
  useIntersectionObserver = false,
  nftRenderer,
}: {
  contractAddress?: string
  ownerAddress?: string
  pageSize?: number
  useIntersectionObserver?: boolean
  nftRenderer: React.ReactNode
}) {
  const { data, isReachingEnd, isValidating, handleLoadMore } = useTokensQuery({
    contractAddress: contractAddress,
    ownerAddress: ownerAddress,
    pageSize: pageSize,
  })

  return (
    <div className="nft-grid__wrapper relative flex w-full flex-col gap-6">
      <div className="nft-grid__token-grid grid gap-3 md:grid-cols-2 md:gap-6">
        {data &&
          data.map((nft) => (
            <NFTProvider
              key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
              contractAddress={nft?.nft?.contract.address}
              tokenId={nft?.nft?.tokenId}
              initialData={nft}>
              {nftRenderer}
            </NFTProvider>
          ))}
      </div>
      <div className="nft-grid__load-more-wrapper flex justify-center">
        {useIntersectionObserver ? (
          <>
            {!isReachingEnd && (
              <NFTGridLoadMore
                showObserver
                isValidating={isValidating}
                handleLoadMore={handleLoadMore}
              />
            )}
          </>
        ) : (
          <button className="nft-grid__button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  )
}
