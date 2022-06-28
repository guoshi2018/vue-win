
import "vue-router";



//可以通过扩展 RouteMeta 接口来输入 meta 字段,以此来约束meta必须和可选的元数据
declare module "vue-router" {
	interface RouteMeta {

		rm100?: boolean;

		rm111: string;
	}
}