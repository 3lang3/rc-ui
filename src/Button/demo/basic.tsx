import React from 'react';
import { Button } from '@zhp-fe/ui';

export default () => (
  <div style={{ background: '#f2f2f2', padding: '0 0.24rem' }}>
    <h3>按钮类型</h3>
    <Button>default</Button>
    <br />
    <Button type="primary">primary</Button>
    <h3>幽灵按钮</h3>
    <Button ghost>default ghost</Button>
    <br />
    <Button ghost type="primary">
      primary ghost
    </Button>
    <h3>危险按钮</h3>
    <Button danger>primary danger</Button>
    <br />
    <Button ghost danger>
      ghost danger
    </Button>
    <h3>自定义颜色</h3>
    <Button color="#7232dd">custom color #7232dd</Button>
    <br />
    <Button ghost color="#7232dd">
      custom color #7232dd ghost
    </Button>
    <br />
    <Button color="linear-gradient(to right, #ff6034, #ee0a24)">custom color gradient</Button>
    <h3>按钮大小</h3>
    <Button size="mini">mini</Button>
    <br />
    <Button size="small">small</Button>
    <br />
    <Button>default</Button>
    <br />
    <Button size="large">lage</Button>
    <br />
    <h3>inline按钮</h3>
    <Button block={false}>default</Button>
    <Button block={false}>default</Button>
    <Button block={false}>default</Button>
    <h3>loading,disabled,圆角</h3>
    <Button loading type="primary">
      loading button
    </Button>
    <br />
    <Button round type="primary">
      round button
    </Button>
    <br />
    <Button round loading disabled danger>
      round disabled button
    </Button>
  </div>
);
