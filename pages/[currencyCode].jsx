import { useRouter } from 'next/router'

import {useEffect} from 'react';

export default function Currency() {
  const router = useRouter();
  const { currencyCode } = router.query;

  useEffect(() => {

    router.push(`/?currencyCode=${currencyCode}`, `${currencyCode}`)
  })

  return(
    <p>a</p>
  )


}