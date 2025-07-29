import React from 'react'
import Card from './featurecards/Card'
function Features() {
  return (
    <section className='w-screen lg:grid lg:grid-cols-3 lg:grid-rows-2 place-items-center gap-y-10 grid-cols-1 grid-rows-6 '>
        <Card heading="Easy Upload" text="No need for any hosting knowledge, simply drag & drop your file." />
        <Card heading="URL Synced Pictures" text="Secure your pictures by easily accessing by a url to restrict viewers."/>
        <Card heading="Low cost" text="PicStack is a static hosting tool which means its very cheap to host your picture regardless of how large it is."/>
        <Card heading="Fast Worldwide" text="we are very fast and can be accessed from anywhere, anytime"/>
        <Card heading="Reliable" text="Don't worry your picss are safe and wont be deleted, unless you do them"/>
        <Card heading="Vast Storage" text="We provide a storage upto 20MB, additional uses cost"/>
    </section>
  )
}

export default Features