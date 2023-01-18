import Head from 'next/head'
import Image from 'next/image'

import Loader from '../components/Loader';

export default function Home() {
  return (
    <div>
      <h1>
        hi
      </h1>
      <Loader show/>
    </div>
  )
}
