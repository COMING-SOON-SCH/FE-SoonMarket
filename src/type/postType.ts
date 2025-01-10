export interface PostImage {
  imageUrl: string;
  originalName: string;
}

export interface Post {
  title: string;
  images: PostImage[];
  postId: number;
  price: number;
  category: string;
  countLike: number;
  openchatUrl: string;
  createAt: string;
  updateAt: string;
  deleteAt: string | null;
  content: string;
}