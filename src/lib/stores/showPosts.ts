import { get, writable } from 'svelte/store';
import { AllPosts } from '$lib/stores/allPosts';
import type { Tags } from '$lib/types/tags';
import type { Post } from '$lib/types/post';

export const ShowPosts = (() => {
  const getAllPosts = () => {
    return Array.from(get(AllPosts).values())
  };
  let _data = getAllPosts();
  const _tags = new Set<Tags.Tag>();

  const _filter = (t: Tags.Tag)=> {
    if(t.category === 'tags')
      {
        _data = _data.filter((e)=>{
          return e.tags.includes(t.name)
        })
        set(_data)
      }else {
        _data = _data.filter((e)=>{
          return e.tags.find((tag: {[key: string]: string} | {[key: string]: string[]})=> {
            if(typeof tag === 'object' && tag[t.category] !== undefined) {
                if(Array.isArray(tag[t.category])) {
                  return tag[t.category].includes(t.name)
                }
                return tag[t.category] === t.name;
            }
            return false;
          })
        })
        set(_data)
      }
  }

  const { subscribe, set } = writable(_data);

  // console.log(_data)
  return {
    subscribe,
    addTag: (t: Tags.Tag)=> {
      _tags.add(t);
    },
    getTags: () => {
      return Array.from(_tags);
    },
    filter: ()=> {
      _tags.forEach((e)=>{
        _filter(e);
      })
    }
  };
})();
