import { createClient } from "./server-client";
import { v4 as uuid } from "uuid";

export const uploadImage = async (postId: string, image: File) => {
  const supabase = await createClient();

  const imageName: string[] = image.name.split(".");
  const uniqueImageName = `${postId}-${imageName[0]}-${uuid()}.${imageName[1]}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(uniqueImageName, image);
  if (error) throw Error;

  const {
    data: { publicUrl },
  } = await supabase.storage.from("images").getPublicUrl(data.path);

  return { image_url: publicUrl, storage_path: data.path };
};
