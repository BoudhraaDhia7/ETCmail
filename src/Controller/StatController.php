<?php
namespace App\Controller;

use Carbon\Carbon;
use App\Entity\MailEntity;
use App\Entity\MailStatusEntity;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class StatController extends AbstractController
{
    /**
     * @Route("/stat/hour",name="hour",methods={"GET"})
     */
    public function index(Request $request, ManagerRegistry $doctrine): Response
    {
        //Check if ajax request
        if ($request->isXmlHttpRequest()) {
            $json_array = [];

            //fetch all time data
            $entityManager = $doctrine->getManager();
            $entity = $entityManager
                ->getRepository(MailStatusEntity::class)
                ->findAll();
            //define json respone for data chart
            $json_array_formated = [['Temps', 'Email lu']];
            $json_array = [
                ['00:00H', 0],
                ['01:00H', 0],
                ['02:00H', 0],
                ['03:00H', 0],
                ['04:00H', 0],
                ['05:00H', 0],
                ['06:00H', 0],
                ['07:00H', 0],
                ['08:00H', 0],
                ['09:00H', 0],
                ['10:00H', 0],
                ['11:00H', 0],
                ['12:00H', 0],
                ['13:00H', 0],
                ['14:00H', 0],
                ['15:00H', 0],
                ['16:00H', 0],
                ['17:00H', 0],
                ['18:00H', 0],
                ['19:00H', 0],
                ['20:00H', 0],
                ['21.00H', 0],
                ['22.00H', 0],
                ['23.00H', 0],
            ];
            $time_array = [];

            //format all data time
            foreach ($entity as $data) {
                $date_str = $data->getSeenDate();
                $pos = strpos($date_str, ' ');
                $pos == 10
                    ? ($date_str = substr($date_str, $pos + 1, 2))
                    : ($date_str = '');
                array_push($time_array, intval($date_str));
            }
            $time_array = array_count_values($time_array);

            //sett times for json respone table

            foreach ($time_array as $key => $time) {
                $json_array[$key][1] = $time;
            }

            //sort table buuble sort
            $size = count($json_array) - 1;
            for ($i = 0; $i < $size; $i++) {
                for ($j = 0; $j < $size - $i; $j++) {
                    $k = $j + 1;
                    if ($json_array[$k][1] > $json_array[$j][1]) {
                        list($json_array[$j], $json_array[$k]) = [
                            $json_array[$k],
                            $json_array[$j],
                        ];
                    }
                }
            }

            //last format for response table
            foreach ($json_array as $data) {
                array_push($json_array_formated, $data);
            }

            //returning the resopone if ajax call was made
            return new JsonResponse(
                [
                    'data' => $json_array_formated,
                ],
                Response::HTTP_OK
            );
        }
        //return for non xml request
        return $this->render('statistique/PerHour.html.twig');
    }
    /**
     * @Route("/stat/person",name="person")
     */
    public function indexPerson(
        Request $request,
        ManagerRegistry $doctrine
    ): Response {
        if ($request->isXmlHttpRequest()) {
            $json_array = [];
            //define json respone for data chart
            $json_array = [
                ['00:00H', 0],
                ['01:00H', 0],
                ['02:00H', 0],
                ['03:00H', 0],
                ['04:00H', 0],
                ['05:00H', 0],
                ['06:00H', 0],
                ['07:00H', 0],
                ['08:00H', 0],
                ['09:00H', 0],
                ['10:00H', 0],
                ['11:00H', 0],
                ['12:00H', 0],
                ['13:00H', 0],
                ['14:00H', 0],
                ['15:00H', 0],
                ['16:00H', 0],
                ['17:00H', 0],
                ['18:00H', 0],
                ['19:00H', 0],
                ['20:00H', 0],
                ['21.00H', 0],
                ['22.00H', 0],
                ['23.00H', 0],
            ];
            //fetch all time data
            $entityManager = $doctrine->getManager();
            $entity = $entityManager
                ->getRepository(MailEntity::class)
                ->findAll();
            $email_array = [];
            $email = trim($request->getContent());
            $total_recivied = 0;

            foreach ($entity as $data) {
                if ($data->getReceiver() == $email) {
                    $total_recivied++;
                    array_push($email_array, $data);
                }
            }
            //format all data time
            $time_array = [];
            // dd($email_array);
            foreach ($email_array as $data) {
                foreach ($data->getUniqueid() as $row) {
                    $date_str = $row->getSeenDate();
                    $pos = strpos($date_str, ' ');
                    $pos == 10
                        ? ($date_str = substr($date_str, $pos + 1, 2))
                        : ($date_str = '');
                    array_push($time_array, intval($date_str));
                }
            }

            $time_array = array_count_values($time_array);

            //sett times for json respone table

            $total_read = 0;
            foreach ($time_array as $key => $time) {
                $total_read += $time;
                $json_array[$key][1] = $time;
            }
            //sort table sort
            $size = count($json_array) - 1;
            for ($i = 0; $i < $size; $i++) {
                for ($j = 0; $j < $size - $i; $j++) {
                    $k = $j + 1;
                    if ($json_array[$k][1] > $json_array[$j][1]) {
                        list($json_array[$j], $json_array[$k]) = [
                            $json_array[$k],
                            $json_array[$j],
                        ];
                    }
                }
            }

            //defien formated array
            $json_array_formated = [
                [
                    'Total email recu ' . $total_recivied,
                    'Total email lu ' . $total_read,
                ],
            ];

            //last format for response table
            foreach ($json_array as $key => $data) {
                array_push($json_array_formated, $data);
                if ($key == 3) {
                    break;
                }
            }
            //returning the resopone if ajax call was made
            return new JsonResponse(
                [
                    'data' => $json_array_formated,
                ],
                Response::HTTP_OK
            );
        }

        return $this->render('statistique/PerPerson.html.twig');
    }
}
?>
