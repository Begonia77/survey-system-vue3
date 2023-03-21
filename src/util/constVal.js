/*问卷状态*/
const UN_PUBLISH = { desc:"未发布", value: 0 };
const IS_PUBLISH = { desc:"已发布", value: 1 };
const IS_STOP = { desc:"已结束", value: 2 };

// 0为判断 1为单选 2为多选 3为单行填空 4为多行填空
/*判断题 0xx*/
const JUDGE = { desc: "判断题", value: 0 };

/*选择题 1xx*/
const SELECT_RADIO = { desc: "单选题", value: 1 };
const SELECT_MULTI = { desc: "多选题", value: 2 };

/*填空题 2xx*/
const FILL = { desc: "简答填空", value: 3 };

export const constVal = {
  JUDGE,
  SELECT_RADIO,
  SELECT_MULTI,
  FILL,
  UN_PUBLISH,
  IS_PUBLISH,
  IS_STOP,
};
