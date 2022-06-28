import { InjectionKey } from "vue";
import { useStore as useStoreSystem, Store } from "vuex";
import { Guoshi } from "@/common/type/guoshi";

//自定义useStore组合式函数,使在使用useStore方法时,ts具备类型提示

//方案一:不使用InjectionKey, 替换系统的useStore. 还可以保留系统useStore,
//本方法改名,例如 useStudentStore
export const useStore = (): Store<Guoshi.Interfaces.StudentPro> => {
  return useStoreSystem<Guoshi.Interfaces.StudentPro>();
};

//方案二:内部使用InjectionKey:
export const studentAsTopstoreKey: InjectionKey<
  Store<Guoshi.Interfaces.StudentPro>
> = Symbol("StudentAsTop");
// export function useTopStore(): Store<Guoshi.Interfaces.Topstate> {
// 	return useStoreSystem(topkey);
// }

//最好使用方案二, 当存在多个互不相关的平行store时, 需要切换时, 容易扩展
