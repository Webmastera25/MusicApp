import { NextResponse } from "next/server";

export const GET = async () => {
  const radios = [
    {
      name: "Radio Erte",
      url: "https://stream.radioereti.ge/stream",
      logo: "/image/radios/erte.png",
    },
    {
      name: "Radio Fortuna",
      url: "https://radiostream.palitra.ge/stream.mp3",
      logo: "/image/radios/radio-fortuna.png",
    },
    {
      name: "Radio Palitra",
      url: "https://radiostream.palitra.ge/stream.mp3",
      logo: "/image/radios/radio-palitra.jpg",
    },
    {
      name: "Radio Maestro",
      url: "https://stream.radiomaestro.ge/stream",
      logo: "/image/radios/radio-maestro.jpg",
    },
    {
      name: "Radio Tbilisi FM",
      url: "https://tbilisifm.ge/stream",
      logo: "/image/radios/radio-tbilisi.webp",
    },
    {
      name: "Radio Positive",
      url: "https://positive.ge/stream",
      logo: "/image/radios/radio-positive.jpg",
    },
    {
      name: "Radio Ajara",
      url: "https://radioajara.ge/stream",
      logo: "/image/radios/radio-ajara.jpg",
    },
    {
      name: "Radio Ar Daidardo",
      url: "https://stream.ardaidardo.ge/stream",
      logo: "/image/radios/radio-ardaidardo.jpeg",
    },
    {
      name: "Radio Harmonia",
      url: "https://harmonia.ge/stream",
      logo: "/image/radios/radio-harmonia.png",
    },
  ];

  return NextResponse.json(radios);
};
