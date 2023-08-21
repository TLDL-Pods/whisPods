"use client";
import Image from "next/image";
import Link from "next/link";
import sters from "@/app/assets/sters.gif";
import birdBones from "@/app/assets/birdbones.gif";

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Sters",
      position: "Developer",
      bio: "All he knows is that he is building this page and he is not sure why. Sters Bot is a G4-Y Model assault bot that has been modified for mathematics specialization and Ethereum retrieval. The empty husk, powered only by profits and decentralization, moves forward with robotic precision.",
      image: sters,
      twitter: "https://twitter.com/0xSters",
      twitterHandle: "@0xSters",
    },
    {
      id: 2,
      name: "Birdbonez",
      position: "Frontend",
      bio: "Everyone needs a guy. I got a guy. Birdbones was born with hollow, super-fast bones giving him the ability to shit on anyone, instantly, for no reason, at any given time. Using the power of his kindergarten diploma and powerful Truck Nuts For Hats amulet he condescends even the most accomplished warriors. ",
      image: birdBones,
    },
  ];

  return (
    <div className="flex justify-center w-full p-4">
      <div className="w-full max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold"> About</h1>
        MP3s to Bullet points. Right now we support The Daily Gwei.
        <h1 className="mb-6 text-2xl font-bold"> Team</h1>
        <div className="flex flex-col space-y-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-4 border rounded">
              <Image
                src={member.image}
                alt={member.name}
                className="w-64 h-64 mx-auto "
                width={100}
                height={100}
              />
              <h2 className="mt-4 text-xl font-semibold text-center">
                {member.name}
              </h2>
              {member.twitterHandle && (
                <p className="mt-2 text-center">
                  <Link
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {member.twitterHandle}
                  </Link>
                </p>
              )}
              <p className="text-center text-gray-500">{member.position}</p>
              <p className="mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
