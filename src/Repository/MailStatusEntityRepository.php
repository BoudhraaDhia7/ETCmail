<?php

namespace App\Repository;

use App\Entity\MailStatusEntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MailStatusEntity>
 *
 * @method MailStatusEntity|null find($id, $lockMode = null, $lockVersion = null)
 * @method MailStatusEntity|null findOneBy(array $criteria, array $orderBy = null)
 * @method MailStatusEntity[]    findAll()
 * @method MailStatusEntity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MailStatusEntityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MailStatusEntity::class);
    }

    public function add(MailStatusEntity $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MailStatusEntity $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return MailStatusEntity[] Returns an array of MailStatusEntity objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MailStatusEntity
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
