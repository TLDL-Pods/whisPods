'use client';

import Link from 'next/link';
import Image from 'next/image';
import TDG from '@/app/assets/the-daily-gwei.jpg';
import { useApp } from '../hooks/useApp';
import Card from '../components/Card';

const podcasts = [
  {
    name: 'The Daily Gwei Refuel',
    href: '/thedailygwei',
    image: TDG,
    hosts: ['Anthony Sassano'],
    description:
      'The Daily Gwei Refuel gives you a recap every week day on everything that happened in the Ethereum and crypto ecosystems over the previous 24 hours - hosted by Anthony Sassano.',
    category: ['Crypto', 'Finance'],
  },
  {
    name: 'The Daily Gwei Refuel',
    href: '/thedailygwei',
    image: TDG,
    hosts: ['Anthony Sassano'],
    description:
      'The Daily Gwei Refuel gives you a recap every week day on everything that happened in the Ethereum and crypto ecosystems over the previous 24 hours - hosted by Anthony Sassano.',
    category: ['Crypto', 'Finance'],
  },
  {
    name: 'The Daily Gwei Refuel',
    href: '/thedailygwei',
    image: TDG,
    hosts: ['Anthony Sassano'],
    description:
      'The Daily Gwei Refuel gives you a recap every week day on everything that happened in the Ethereum and crypto ecosystems over the previous 24 hours - hosted by Anthony Sassano.',
    category: ['Crypto', 'Finance'],
  },
  {
    name: 'The Daily Gwei Refuel',
    href: '/thedailygwei',
    image: TDG,
    hosts: ['Anthony Sassano'],
    description:
      'The Daily Gwei Refuel gives you a recap every week day on everything that happened in the Ethereum and crypto ecosystems over the previous 24 hours - hosted by Anthony Sassano.',
    category: ['Crypto', 'Finance'],
  },
];

export default function Home() {
  const { state } = useApp();

  return (
    <div className="flex w-full max-w-full flex-col items-center pb-24">
      <h1 className="my-8 text-3xl font-light">
        <span className="font-semibold">TLDL </span>SUPPORTED PODCASTS
      </h1>
      <div className="grid-rows-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-20 gap-y-12 2xl:grid-cols-2">
        {podcasts.map((podcast) => (
          <Link href={podcast.href}>
            <Card
              topBarColor="bg-accent"
              cardTitle={podcast.name}
              cardSubTitle={podcast.hosts}
              cardSubTitle2={podcast.category}
              cardBody={podcast.description}
              imageHref={podcast.image}
              backgroundColor="bg-base2"
              cardFooter={
                <h3 className="w-full text-right text-sm">
                  <span className="font-semibold">TLDL </span>
                  <span className="">Episodes: </span>
                  <span className="font-bold">156</span>
                </h3>
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
