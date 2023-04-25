import useAxios from '@/hooks/useAxios'

const useFetcher = () => {
  const axios = useAxios()
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  return fetcher
}

export default useFetcher
