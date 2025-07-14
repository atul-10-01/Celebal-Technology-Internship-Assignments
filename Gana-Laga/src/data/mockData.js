export const mockSongs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    albumId: 1,
    duration: "3:20",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    genre: "Pop"
  },
  {
    id: 2,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    albumId: 2,
    duration: "2:54",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&crop=face",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    genre: "Pop"
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    albumId: 3,
    duration: "3:23",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=face",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    genre: "Pop"
  },
  {
    id: 4,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    albumId: 1,
    duration: "3:35",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    genre: "Pop"
  },
  {
    id: 5,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    albumId: 4,
    duration: "2:58",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=300&h=300&fit=crop&crop=face",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    genre: "Pop"
  }
];

export const mockPlaylists = [
  {
    id: 1,
    name: "My Favorites",
    description: "Your most played songs",
    songs: [1, 2, 3],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
    createdAt: "2025-05-15T14:22:00Z"
  },
  {
    id: 2,
    name: "Chill Vibes",
    description: "Relaxing music for any time",
    songs: [2, 4, 5],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&crop=face",
    createdAt: "2025-06-20T09:15:00Z"
  }
];

export const mockAlbums = [
  {
    id: 1,
    title: "After Hours",
    artist: "The Weeknd",
    year: "2020",
    genre: "Pop/R&B",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
    artistImage: "https://images.unsplash.com/photo-1608653282544-7a9f93126252?w=300&h=300&fit=crop&crop=face",
    description: "The fourth studio album by Canadian singer The Weeknd, featuring hit singles like 'Blinding Lights' and 'Save Your Tears'.",
    releaseDate: "March 20, 2020"
  },
  {
    id: 2,
    title: "Fine Line",
    artist: "Harry Styles",
    year: "2019",
    genre: "Pop/Rock",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&crop=face",
    artistImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop&crop=face",
    description: "The second studio album by English singer and songwriter Harry Styles, featuring the singles 'Lights Up', 'Adore You', and 'Watermelon Sugar'.",
    releaseDate: "December 13, 2019"
  },
  {
    id: 3,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    year: "2020",
    genre: "Pop/Disco",
    cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=face",
    artistImage: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=300&h=300&fit=crop&crop=face",
    description: "The second studio album by English singer Dua Lipa, featuring the singles 'Don't Start Now', 'Physical', and 'Levitating'.",
    releaseDate: "March 27, 2020"
  },
  {
    id: 4,
    title: "SOUR",
    artist: "Olivia Rodrigo",
    year: "2021",
    genre: "Pop/Rock",
    cover: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=300&h=300&fit=crop&crop=face",
    artistImage: "https://images.unsplash.com/photo-1596935884413-260a972dab44?w=300&h=300&fit=crop&crop=face",
    description: "The debut studio album by American singer-songwriter Olivia Rodrigo, featuring the singles 'drivers license', 'deja vu', and 'good 4 u'.",
    releaseDate: "May 21, 2021"
  }
];

export const mockGenres = [
  { id: 1, name: "Pop", color: "bg-purple-500" },
  { id: 2, name: "Rock", color: "bg-red-500" },
  { id: 3, name: "Hip Hop", color: "bg-yellow-500" },
  { id: 4, name: "Electronic", color: "bg-blue-500" },
  { id: 5, name: "Jazz", color: "bg-green-500" },
  { id: 6, name: "Classical", color: "bg-indigo-500" }
];
