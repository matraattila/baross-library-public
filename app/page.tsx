'use client'
import React from 'react'
import Page from '@/components/Page'
import Heading from '@/components/ui/Heading'
import useSWRImmutable from 'swr/immutable'
import useFetcher from '@/hooks/useFetcher'
import { STATISTICS_API } from '@/lib/constants'
import UploadBooks from '@/components/uploadBooks'
import Chart from 'react-apexcharts'
import { SWRResponse } from 'swr'
import { LoadingCircle } from '@/components/ui/LoadingIcons'

const chartMainColor = '#054d2e'

const Home = () => {
  // Fetch
  const fetcher = useFetcher()
  const { data, error, isValidating }: SWRResponse<{ uploads: { value: number; date: string }[] }> =
    useSWRImmutable(STATISTICS_API, fetcher)

  if (error) {
    return <Heading intent="error">{error?.message}</Heading>
  }

  if (!data && isValidating) {
    return <LoadingCircle />
  }

  return (
    <Page className="h-full grid gap-10">
      {/* <Heading className="text-center">Library</Heading> */}
      <div
        className={
          'mx-auto w-full max-w-[90%] flex flex-col xl:flex-row justify-items-center gap-10 text-center rounded-lg bg-white/90 px-4 py-6 md:p-8'
        }
      >
        <UploadBooks className="self-center" />

        <section className="grow">
          <Heading className="col-span-2 text-center" intent="secondary">
            Uploads
          </Heading>
          {data?.uploads ? (
            <Chart
              options={{
                chart: {
                  width: '100%',
                  height: 100,
                  toolbar: {
                    tools: {
                      pan: false,
                    },
                  },
                },
                xaxis: {
                  categories: data.uploads.map((upload) =>
                    new Date(upload.date).toLocaleDateString(undefined, {
                      dateStyle: 'medium',
                    })
                  ),
                },
                stroke: {
                  curve: 'smooth',
                },
                fill: {
                  type: 'gradient',
                  colors: [chartMainColor],
                },
                responsive: [
                  {
                    breakpoint: 1300,
                    options: {
                      xaxis: {
                        categories: data.uploads.map((upload) =>
                          new Date(upload.date).toLocaleDateString(undefined, {
                            dateStyle: 'short',
                          })
                        ),
                      },
                    },
                  },
                  {
                    breakpoint: 750,
                    options: {
                      chart: {
                        height: 500,
                      },
                    },
                  },
                ],
              }}
              series={[
                {
                  name: 'Upload',
                  data: data.uploads.map((upload) => upload.value),
                  color: chartMainColor,
                },
              ]}
              type="area"
            />
          ) : null}
        </section>
      </div>
    </Page>
  )
}

export default Home
