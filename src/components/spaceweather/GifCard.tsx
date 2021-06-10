import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { AnimationBuilder } from 'util/AnimationBuilder';

interface GifCardProps {
  id: string;
  url: string;
  width: number;
  height: number;
}

const GifCard: React.FC<GifCardProps> = (props) => {
  const [builder, setBuilder] = useState<AnimationBuilder | null>(null);
  useEffect(() => {
    setBuilder(
      new AnimationBuilder(props.url, props.id, props.width, props.height),
    );
    return () => {
      builder?.pause();
      setBuilder(null);
    };
  }, []);
  useEffect(() => {
    if (builder !== null) {
      builder.resize(props.width, props.height);
      builder.populateImages();
    }
  }, [props.width, props.height, builder]);

  return (
    <Card>
      <canvas width={props.width} height={props.height} id={props.id}></canvas>
    </Card>
  );
};

export default GifCard;
