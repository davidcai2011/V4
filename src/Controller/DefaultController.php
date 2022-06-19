<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_default')]
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }
    #[Route('/auto', name: 'app_auto')]

    public function auto(): Response
    {
        return $this->render('auto1.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }



    #[Route('/invoice', name: 'invoice_list', methods: 'GET')]
    public function invoiceListAction()
    {
        $curl = curl_init();
        $headers = array(
            'Accept: application/json',
            'Content-Type: application/json',

        );
        curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, 'GET' );
        curl_setopt($curl, CURLOPT_URL, 'http://localhost:8098/api/invoices?page=1');
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($curl);
        echo $result;
        curl_close($curl);


      return $this->render('invoice/invoice.html.twig',  [
        'result' =>  $result ]);
    }

    #[Route('/invoice/{id?NULL}', name: 'invoice_edit', methods: 'GET')]
    public function invoiceEditAction($id)
    {

        return $this->render('invoice/invoice_new.html.twig',  [
            'id' =>  $id ]);
    }
    #[Route('/invoice_new', name: 'invoice_new', methods: 'GET')]
    public function invoiceNewAction()
    {
//        return $this->redirectToRoute('home');

//        $customer=new CustomerController(CustomerRepository);
//        $data=$customer->index();
        return $this->render('invoice/invoice_new.html.twig');
    }
}
