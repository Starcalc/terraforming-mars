import { OrOptions } from "./OrOptions";
import { PlayerInput } from "../PlayerInput";
import { ISpace } from "../ISpace";
import { PlayerInputTypes } from "../PlayerInputTypes";

export class SelectSpace implements PlayerInput {
    public inputType: PlayerInputTypes = PlayerInputTypes.SELECT_SPACE;
    public buttonLabel = "Save"; //not used (for now)
    constructor(
        public title: string,
        public availableSpaces: Array<ISpace>,
        public cb: (space: ISpace) => OrOptions | SelectSpace | undefined
    ) {
        if (availableSpaces.length === 0) {
            throw "No available spaces";
        }
    }
}
