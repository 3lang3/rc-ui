import React from 'react';
import { Image } from '@zhp-fe/ui';

export default () => (
  <div>
    <h3>基础用法</h3>
    <Image src="https://img01.yzcdn.cn/vant/cat.jpeg" style={{ width: 100, height: 100 }} />
    <h3>填充模式</h3>
    <Image
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      style={{ width: 100, height: 100 }}
    />
    <Image
      fit="contain"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      style={{ width: 100, height: 100 }}
    />
    <Image
      fit="fill"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      style={{ width: 100, height: 100 }}
    />
    <Image
      fit="none"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      style={{ width: 100, height: 100 }}
    />
    <Image
      fit="scale-down"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      style={{ width: 100, height: 100 }}
    />
    <h3>图片形状</h3>
    <Image
      fit="contain"
      round
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      style={{ width: 100, height: 100 }}
    />
    <h3>加载失败(自定义icon)</h3>
    <Image
      src="https://img01.yzcdn.cn/vant/cataa.jpeg"
      style={{ width: 100, height: 100, marginRight: 10 }}
    />
    <Image
      src="https://img01.yzcdn.cn/vant/cataa.jpeg"
      errorIcon={<div>err</div>}
      style={{ width: 100, height: 100 }}
    />
  </div>
);
