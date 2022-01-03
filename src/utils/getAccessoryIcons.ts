
import SpeedSvg from '../assets/speed.svg';
import AccelerationSvg from '../assets/acceleration.svg';
import ForceSvg from '../assets/force.svg';
import GasolineSvg from '../assets/gasoline.svg';
import EnergySvg from '../assets/energy.svg';
import HybridSvg from '../assets/hybrid.svg';
import ExchangeSvg from '../assets/exchange.svg';
import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';


export function getAccessoryImg(name: string) {
  if (name === 'acceleration') return AccelerationSvg;
  if (name === 'exchange') return ExchangeSvg;
  if (name === 'seats') return PeopleSvg;
  if (name === 'turning_diameter') return ForceSvg;
  if (name === 'gasoline_motor') return GasolineSvg;
  if (name === 'hybrid_motor') return HybridSvg;
  if (name === 'electric_motor') return EnergySvg;
  if (name === 'electric') return EnergySvg;
  if (name === 'speed') return SpeedSvg;
  return CarSvg;
}