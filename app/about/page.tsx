'use client';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers, aboutQuestions } from '../data/aboutData';

export default function About() {
  return (
    <div className="flex justify-center p-6 pt-28 lg:pt-32">
      <div className="w-full max-w-5xl">
        <h1 className="text-center text-3xl font-thin">ABOUT</h1>

        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-8 lg:mt-12">
          {aboutQuestions.map((question, i) => (
            <div key={i} className="mt-4">
              <h3 className="text-3xl font-semibold text-secondary">
                {question.q}
              </h3>
              <p className="mt-2">{question.a}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto my-12 w-4/5 border-b border-baseText1 lg:my-24"></div>
        <h1 className="text-center text-3xl font-thin">THE TEAM</h1>
        <div className="mt-12 flex flex-col gap-2 space-y-6 lg:mt-6 lg:flex-row lg:space-y-0">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col rounded-lg lg:h-[600px] lg:p-12"
            >
              <Image
                src={member.image}
                alt={member.name}
                className="mx-auto h-64 w-64 rounded-full border-4 border-baseText lg:h-72 lg:w-72"
              />
              <h2 className="mt-4 text-center text-2xl font-semibold">
                {member.name}
              </h2>

              <p className="h-6 text-center">
                <Link
                  href={member.twitter ? member.twitter : ''}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {member.twitterHandle ? member.twitterHandle : ''}
                </Link>
              </p>

              <p className="mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
