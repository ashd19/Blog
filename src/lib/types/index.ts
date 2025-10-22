export interface PostListProps {
  posts: Array<{
    id: number;
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    author: {
      name: string;
    };
  }>;
}

// think of this like a singuSlar post item

export interface PostCardProps {
  postcard: {
    id: number;
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    author: {
      name: string;
    };
  };
}
export interface PostContentProps {
  posts: {
    id: number;
    content: string;
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
      name: string;
    };
  };
  isAuthor: boolean; // used  , thus
}

export interface PostFormProps {
  isEditing?: boolean;
  post?: {
    id: number;
    title: string;
    content:string;
    description: string;
    slug: string;
    
  };
}
