export interface XHSResponse<T> {
  msg: string;
  data: T;
  code: number;
  success: boolean;
}

export interface SearchData {
  has_more: boolean;
  items: Item[];
}

interface Item {
  id: string;
  model_type: string;
  note_card?: Notecard;
  xsec_token: string;
  hot_query?: Hotquery;
}

interface Hotquery {
  title: string;
  source: number;
  word_request_id: string;
  queries: Query[];
}

interface Query {
  name: string;
  search_word: string;
  cover: string;
  id: string;
}

interface Notecard {
  type: string;
  display_title: string;
  user: User;
  interact_info: Interactinfo;
  cover: Cover;
  image_list: Imagelist[];
  corner_tag_info: Cornertaginfo[];
}

interface Cornertaginfo {
  type: string;
  text: string;
}

interface Imagelist {
  height: number;
  width: number;
  info_list: Infolist[];
}

interface Infolist {
  image_scene: string;
  url: string;
}

interface Cover {
  url_default: string;
  url_pre: string;
  height: number;
  width: number;
}

interface Interactinfo {
  liked: boolean;
  liked_count: string;
  collected: boolean;
  collected_count: string;
  comment_count: string;
  shared_count: string;
}

interface User {
  avatar: string;
  user_id: string;
  nickname: string;
  xsec_token: string;
  nick_name: string;
}
