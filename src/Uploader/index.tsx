/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import * as React from 'react';
import { Camera, CloseSmall, Rotation, CloseOne } from '@icon-park/react';
import { useRequest } from 'ahooks';
import cn from 'classnames';
import { isNilObject } from '../utils';
import './uploader.less';

interface UploaderProps {
  value?: string | string[];
  onChange?: (props: any) => void;
  request: Promise<any>;
  /**
   * 上传的地址
   */
  action?: string;
  /**
   * 发到后台的文件参数名
   */
  name?: string;
  /**
   * 上传所需额外参数或返回上传额外参数的方法
   */
  data?: { name?: string } & Record<string, any>;
  /**
   * 是否开启图片多选，部分安卓机型不支持
   */
  multiple?: boolean;
  /**
   * 文件上传数量限制
   */
  maxCount?: number;
  /**
   * 接受上传的文件类型
   * 详见 @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   * @default 'image/*'
   */
  accept?: string;
  /**
   * 是否禁用文件上传
   */
  disabled?: boolean;
  className?: string;
}

type FileItemProps = {
  /** 唯一标识符 */
  key: number;
  /** 递交给外部form的值 */
  url?: string;
  /** 图片本地url */
  localUrl?: string;
  /** 上传状态 */
  status: 'done' | 'uploading' | 'failed';
};

let key = 0;

export default (props: UploaderProps) => {
  const innerRef = React.useRef(false);
  const {
    accept = 'image/*',
    name = 'img[]',
    data,
    value,
    multiple = true,
    maxCount = 1,
    className,
    request,
  } = props;
  const uploadReq = useRequest(request, { manual: true });
  const isSingle = !multiple || maxCount === 1;
  const [list, setList] = React.useState<FileItemProps[]>(() => {
    if (typeof value === 'string') {
      return [{ status: 'done', url: value, key: key++ }];
    }
    if (Array.isArray(value)) {
      return value.map((url) => ({ status: 'done', url, key: key++ }));
    }
    return [];
  });
  const acceptCount = isSingle ? 1 : maxCount;
  const showUploader = list.length < acceptCount;

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current = false;
      return;
    }
    if (!value) {
      setList([]);
      return;
    }
    if (typeof value === 'string') {
      setList([{ status: 'done', url: value, key: key++ }]);
      return;
    }
    if (Array.isArray(value)) {
      setList(value.map((url) => ({ status: 'done', url, key: key++ })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(value)]);

  // 同步表单值
  const triggerChange = (v: FileItemProps[]) => {
    if (props.onChange) {
      props.onChange(isSingle ? v[0].url : v.map((el) => el.url).filter(Boolean));
    }
    setList(v);
    innerRef.current = true;
  };
  // 本地上传
  const onFileInputChange = async ({ target }: any) => {
    const { files } = target;
    const localFiles = Array.prototype.slice.call(files);
    // 超过最大上传数量
    if (list.length + localFiles.length > acceptCount) return;
    // 上传位置标记
    const startIdx = list.length;
    // 本地文件列表 立即展示图片
    const localFilesList = localFiles.map((file) => ({
      localUrl: URL.createObjectURL(file),
      status: 'uploading',
      key: key++,
    })) as FileItemProps[];
    setList((v) => [...v, ...localFilesList]);

    // 组装表单数据
    const formdata = new FormData();
    if (isSingle || files.length === 1) {
      formdata.append(name, files[0]);
    }
    if (files.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i < files.length; i++) {
        formdata.append(name, files[i]);
      }
    }
    if (data && !isNilObject(data)) {
      Object.entries(data).forEach(([k, v]) => formdata.append(k, v));
    }

    // 上传action
    try {
      const { data: res, type, msg } = await uploadReq.run(formdata);
      if (type === 1) throw Error(msg);
      setList((v) => {
        const newList = v.map((el, i) => {
          if (i >= startIdx) return { ...el, status: 'done', url: res.url[res.url.length - i - 1] };
          return el;
        }) as FileItemProps[];
        if (props.onChange) {
          props.onChange(isSingle ? newList[0].url : newList.map((el) => el.url));
        }
        return newList;
      });
    } catch (error) {
      // 上传失败status调整
      setList((v) =>
        v.map((el, i) => {
          if (i >= startIdx) {
            return { ...el, status: 'failed' };
          }
          return el;
        }),
      );
      console.log(error);
    }
  };

  // 删除事件
  const deleteItem = (k: any) => {
    const newValue = list.filter((el) => el.key !== k) as FileItemProps[];
    triggerChange(newValue);
  };

  return (
    <div className={cn('local-uploader', className)}>
      <div className="local-uploader__wrapper">
        {list.length
          ? list.map(({ key: _id, url, status, localUrl }) => (
              <div key={_id} className="local-uploader__preview">
                {/* 删除按钮 */}
                {status !== 'uploading' && (
                  <div onClick={() => deleteItem(_id)} className="local-uploader__preview-delete">
                    <CloseSmall theme="outline" fill="#fff" />
                  </div>
                )}
                {/* 上传状态ui */}
                {status === 'uploading' || status === 'failed' ? (
                  <div className="local-uploader__mask">
                    {status === 'uploading' ? (
                      <Rotation
                        theme="outline"
                        className="local-uploader__mask-icon local-loader"
                      />
                    ) : (
                      <CloseOne theme="outline" className="local-uploader__mask-icon" />
                    )}

                    <div className="local-uploader__mask-msg">
                      {(() => {
                        if (status === 'uploading') return '上传中...';
                        if (status === 'failed') return '上传失败';
                        return null;
                      })()}
                    </div>
                  </div>
                ) : null}
                {/* 图片预览 */}
                <div className="local-uploader__preview-image">
                  <img alt="img" src={url ? `https://img.yigeyougou.com/${url}` : localUrl} />
                </div>
              </div>
            ))
          : null}
        {/* 上传按钮 */}
        {showUploader && (
          <div className="local-uploader__upload">
            <Camera theme="filled" size="24" fill="#dcdee0" />
            <input
              className="local-uploader__upload-input"
              type="file"
              multiple={multiple}
              accept={accept}
              onChange={onFileInputChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
