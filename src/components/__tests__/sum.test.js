import { sum} from "../sum.js";

test("Check sum of two positive numbers", ()=>{
    expect(sum(2,5)).toBe(7);
});