import React from 'react';
import { Toast, Button } from '@zhp-fe/ui';

export default () => (
  <div style={{ background: '#f2f2f2', padding: '0 0.24rem' }}>
    <h3>基础用法</h3>
    <Button
      onClick={() => {
        Toast.info('这是一条文字提示');
      }}
    >
      文字提示
    </Button>
    <br />
    <Button
      onClick={() => {
        Toast.loading();
      }}
    >
      加载提示
    </Button>
    <br />
    <Button
      onClick={() => {
        Toast.success();
      }}
    >
      成功提示
    </Button>
    <br />
    <Button
      danger
      onClick={() => {
        Toast.error('错误的提示');
      }}
    >
      失败提示
    </Button>
    <br />
    <Button
      type="primary"
      onClick={() => {
        Toast.info('在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。');
      }}
    >
      多行提示
    </Button>
    <br />
    <Button
      danger
      ghost
      onClick={() => {
        Toast.destroy();
      }}
    >
      销毁提示
    </Button>
    <br />
  </div>
);
