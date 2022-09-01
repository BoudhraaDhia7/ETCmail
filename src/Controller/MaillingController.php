<?php
namespace App\Controller;

use Carbon\Carbon;
use App\Entity\MailEntity;
use App\Service\MailerService;
use App\Entity\MailStatusEntity;
use Symfony\Component\Mime\Email;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MaillingController extends AbstractController
{
    /**
     * @Route("/send",name="MailSend",methods={"POST"})
     */
    public function sendEmail(
        MailerInterface $mailer,
        ManagerRegistry $doctrine,
        Request $request
    ): Response {
        $date = Carbon::now('CET')->toDateTimeString();
        $unique_id = uniqid() . '_' . str_replace(' ', '_', $date);
        $entityManager = $doctrine->getManager();
        $entity = new MailEntity();
        $sender = 'boudhraadhia9@gmail.com';
        $to = $request->request->get('to');
        $subjuct = $request->request->get('object');
        $content = $request->request->get('content');

        //define img route to update seen statue

        $url =
            //$request->getScheme()
            'https' .
            '://' .
            $request->getHttpHost() .
            $request->getBasePath() .
            '/email/update/' .
            $unique_id;

        //creating the email object
        $email = (new Email())
            ->from($sender)
            ->to($to)
            ->subject($subjuct)
            ->text($content)
            ->html(
                '<p>"' .
                    $content .
                    '"<p/>' .
                    '<img style="display:none" src="' .
                    $url .
                    '" border="0"/ alt="gif ig gif">'
            );

        //send and save email to database

        try {
            $mailer->send($email);
            $entity->setReceiver($to);
            $entity->setSender($sender);
            $entity->setDate(Carbon::now('CET')->format('d/m/Y'));
            $entity->setSubject($subjuct);
            $entity->setContent($content);
            $entity->setForingId($unique_id);

            //save entity to dataBase
            $entityManager->persist($entity);
            $entityManager->flush();
        } catch (TransportExceptionInterface $e) {
            dd($e);
        }

        return $this->redirectToRoute('index');
    }

    /**
     * @Route("/email/update/{id}",name="updateStatues")
     */
    public function updateStatue(ManagerRegistry $doctrine, $id): Response
    {
        //once reciver open the email it save to databese the new state
        $mail = $doctrine
            ->getRepository(MailEntity::class)
            ->findOneBy(['foring_id' => $id]);

        if (!$mail) {
            throw $this->createNotFoundException('mail found for id ' . $id);
        }
        //Add new status to the database
        $entityManager = $doctrine->getManager();
        $entity = new MailStatusEntity();
        $entity->setUniqueId($id);
        $entity->setMailEntity($mail);
        $entity->setSeenDate(Carbon::now('CET')->format('d/m/Y H:i'));
        $entityManager->persist($entity);
        $entityManager->flush();

        return $this->render('mailling/AllMail.html.twig');
    }

    /**
     * @Route("/",name="index",methods={"GET"})
     */
    public function index(Request $request, ManagerRegistry $doctrine)
    {
        if ($request->isXmlHttpRequest()) {
            //run when ajax call was made
            $entityManager = $doctrine->getManager();
            $entity = $entityManager
                ->getRepository(MailEntity::class)
                ->findAll();
            $json_array = [];

            //formating to json and then return the json object for the data_tables as json object
            foreach ($entity as $value) {
                array_push($json_array, $value->jsonSerialize());
            }

            return new JsonResponse(
                [
                    'data' => $json_array,
                ],
                Response::HTTP_OK
            );
        }
        $entityManager = $doctrine->getManager();
        $entity = $entityManager->getRepository(MailEntity::class)->findAll();
        return $this->render('mailling/AllMail.html.twig', [
            'total' => count($entity) - 1,
        ]);
    }
    /**
     * @Route("/unseen",name="unseen",methods={"GET"})
     */
    public function unseenMail(Request $request, ManagerRegistry $doctrine)
    {
        //same as index
        $json_array = [];
        $seenArray = [];
        if ($request->isXmlHttpRequest()) {
            $entityManager = $doctrine->getManager();
            $entity = $entityManager
                ->getRepository(MailEntity::class)
                ->findAll();
            foreach ($entity as $key => $mail) {
                $status = $mail->getUniqueid();
                foreach ($status as $state) {
                    array_push($seenArray, $mail->getId());
                }
            }
            foreach ($entity as $key => $mail) {
                if (!in_array($mail->getId(), $seenArray)) {
                    array_push($json_array, $mail->jsonSerialize());
                }
            }

            return new JsonResponse(
                [
                    'data' => $json_array,
                ],
                Response::HTTP_OK
            );
        }

        $entityManager = $doctrine->getManager();
        $entity = $entityManager->getRepository(MailEntity::class)->findAll();
        return $this->render('mailling/unseen.html.twig', [
            'total' => count($entity) - 1,
        ]);
    }
    /**
     * @Route("/seen",name="seen",methods={"GET"})
     */
    public function seenMail(Request $request, ManagerRegistry $doctrine)
    {
        $json_array = [];
        $seenArray = [];
        if ($request->isXmlHttpRequest()) {
            $entityManager = $doctrine->getManager();
            $entity = $entityManager
                ->getRepository(MailEntity::class)
                ->findAll();
            foreach ($entity as $key => $mail) {
                $status = $mail->getUniqueid();
                foreach ($status as $state) {
                    array_push($seenArray, $mail->getId());
                }
            }
            foreach ($entity as $key => $mail) {
                if (in_array($mail->getId(), $seenArray)) {
                    array_push($json_array, $mail->jsonSerialize());
                }
            }

            return new JsonResponse(
                [
                    'data' => $json_array,
                ],
                Response::HTTP_OK
            );
        }

        $entityManager = $doctrine->getManager();
        $entity = $entityManager->getRepository(MailEntity::class)->findAll();
        return $this->render('mailling/seen.html.twig', [
            'total' => count($entity) - 1,
        ]);
    }
    /**
     * @Route("/compose",name="compose",methods={"GET"})
     */
    public function compose()
    {
        return $this->render('mailling/NewMail.html.twig');
    }
    /**
     * @Route("/preview/{id}",name="preview",methods={"GET"})
     */
    public function preview($id, ManagerRegistry $doctrine)
    {
        //preview the email
        $mail = $doctrine->getRepository(MailEntity::class)->find($id);
        if (!$mail) {
            throw $this->createNotFoundException(
                'No product found for id ' . $id
            );
        }
        return $this->render('mailling/MailPreview.html.twig', [
            'content' => $mail->getContent(),
            'subject' => $mail->getSubject(),
            'receiver' => $mail->getReceiver(),
        ]);
    }
}

?>
