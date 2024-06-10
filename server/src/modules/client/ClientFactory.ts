import ClientRepository from '../../entities/ClientRepository';
import OrderRepository from '../../entities/OrderRepository';
import ProductRepository from '../../entities/ProductRepository';
import ClientController from './ClientController';
import ClientServices from './ClientServices';

export const clientFactory = () => {
  const clientRepository = new ClientRepository();
  const orderRepository = new OrderRepository();
  const productRepository = new ProductRepository();
  const services = new ClientServices(
    clientRepository,
    orderRepository,
    productRepository,
  );
  const controller = new ClientController(services, orderRepository);
  return controller;
};
