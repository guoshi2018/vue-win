import { Guoshi } from "@/common/type/guoshi";

export default class TodoModel {
	protected static readonly STORAGE_KEY = "vue3-mvc-by-guoshi";
	private _items: Guoshi.Types.Todo[];
	private _nextId: number;
	public constructor() {
		this._items = JSON.parse(localStorage.getItem(TodoModel.STORAGE_KEY) || "[]");
		this._nextId = this._items.length + 1;
	}

	public addTodo(desc: string): void {
		const d = desc.trim();
		if (d.length > 0) {
			this._items.push({
				id: this._nextId++,
				description: desc,
				done: false,
			});
		}
	}

	public remove(todo?: Guoshi.Types.Todo): void {
		if (todo) {
			this._items.splice(this._items.indexOf(todo), 1);
		}
	}

	public removeById(targetId: number): void {
		this.remove(this._items.find(todo => {
			return todo.id == targetId;
		}));
	}

	public removeByDescription(targetDesc: string): void {
		this._items.filter(todo => todo.description == targetDesc)
			.forEach(todo => this.remove(todo));
	}

	public removeByDone(targetDone: boolean): void {
		this._items.filter(todo => todo.done == targetDone)
			.forEach(todo => this.remove(todo));
	}

	public save(): void {
		localStorage.setItem(TodoModel.STORAGE_KEY, JSON.stringify(this._items));
	}

	/**
	 * 获取指定范围的所有todo
	 * @param range 表征完成状态的范围值: "all" 或 "done" 或 "undone",
	 * 	"all": 		全部todo
	 * 	"done": 	 已完成的todo
	 * 	"undone": 	未完成的todo
	 * @returns 
	 */
	todos(range: Guoshi.Types.Range): Guoshi.Types.Todo[] {
		let tds: Guoshi.Types.Todo[];
		switch (range) {
			case "all":
				tds = this._items;
				break;
			case "done":
				tds = this._items.filter((todo) => todo.done);
				break;
			case "undone":
				tds = this._items.filter((todo) => !todo.done);
				break;
			default:
				tds = [];
				break;
		}
		return tds;
	}


	/**
	 * 当前是否全部todo已经完成
	 */
	get allDone(): boolean {
		return !this._items.some(todo => todo.done == false);
	}
	/**
	 * 所有todo均设置为指定的done状态
	 */
	set allDone(done: boolean) {
		this._items.forEach(todo => {
			todo.done = done;
		});
	}
}
